from flask import Flask, request, jsonify
from flask_cors import CORS
import colour
import numpy as np

app = Flask(__name__)
CORS(app)

# Expanded color database with 50+ furniture colors
COLOR_DATABASE = {
    "furniture_colors": [
        # Neutrals
        {"name": "Pure White", "hex": "FFFFFF", "lab": [100.0, 0.0, 0.0]},
        {"name": "Soft White", "hex": "F5F5F5", "lab": [96.0, 0.0, 0.0]},
        {"name": "Warm White", "hex": "F8F8F8", "lab": [97.0, 0.0, 0.0]},
        {"name": "Black", "hex": "000000", "lab": [0.0, 0.0, 0.0]},
        {"name": "Charcoal", "hex": "36454F", "lab": [27.0, 0.0, -5.0]},
        {"name": "Slate Gray", "hex": "708090", "lab": [50.0, -5.0, -5.0]},
        
        # Wood Tones
        {"name": "Classic Walnut", "hex": "773F1A", "lab": [30.0, 15.0, 25.0]},
        {"name": "Golden Oak", "hex": "D2A560", "lab": [70.0, 10.0, 35.0]},
        {"name": "Espresso", "hex": "4A3123", "lab": [20.0, 10.0, 15.0]},
        {"name": "Cherry", "hex": "6E2C2C", "lab": [30.0, 40.0, 20.0]},
        {"name": "Mahogany", "hex": "C04000", "lab": [50.0, 50.0, 30.0]},
        {"name": "Teak", "hex": "B1946F", "lab": [65.0, 10.0, 30.0]},
        {"name": "Pine", "hex": "FFE4B5", "lab": [90.0, 5.0, 30.0]},
        {"name": "Ash Gray", "hex": "B2BEB5", "lab": [75.0, -5.0, 5.0]},
        
        # Colorful Options
        {"name": "Sage Green", "hex": "7A9A76", "lab": [60.0, -15.0, 15.0]},
        {"name": "Emerald", "hex": "50C878", "lab": [75.0, -40.0, 30.0]},
        {"name": "Navy Blue", "hex": "1A3A6E", "lab": [25.0, -5.0, -30.0]},
        {"name": "Royal Blue", "hex": "4169E1", "lab": [50.0, 10.0, -50.0]},
        {"name": "Taupe", "hex": "B38B6D", "lab": [60.0, 10.0, 20.0]},
        {"name": "Blush Pink", "hex": "F8C3CD", "lab": [85.0, 15.0, 5.0]},
        {"name": "Dusty Rose", "hex": "DCAE96", "lab": [75.0, 15.0, 15.0]},
        {"name": "Teal", "hex": "008080", "lab": [50.0, -30.0, -5.0]},
        {"name": "Mustard", "hex": "FFDB58", "lab": [85.0, 10.0, 70.0]},
        {"name": "Terracotta", "hex": "E2725B", "lab": [65.0, 40.0, 30.0]},
        {"name": "Lavender", "hex": "E6E6FA", "lab": [90.0, 5.0, -10.0]},
        {"name": "Mint", "hex": "98FF98", "lab": [95.0, -25.0, 20.0]},
        {"name": "Coral", "hex": "FF7F50", "lab": [70.0, 45.0, 35.0]},
        {"name": "Olive Green", "hex": "808000", "lab": [50.0, -10.0, 40.0]},
        {"name": "Eggplant", "hex": "614051", "lab": [30.0, 20.0, -10.0]},
        {"name": "Steel Blue", "hex": "4682B4", "lab": [55.0, -10.0, -25.0]}
    ]
}

def hex_to_rgb(hex_color):
    """Convert hex string to RGB (normalized to 0-1)"""
    hex_color = hex_color.lstrip('#')
    if len(hex_color) == 3:
        hex_color = ''.join([c * 2 for c in hex_color])
    return [int(hex_color[i:i+2], 16) / 255.0 for i in (0, 2, 4)]

def hex_to_lab(hex_color):
    """Convert hex color to LAB color space using colour-science"""
    try:
        rgb = hex_to_rgb(hex_color)
        xyz = colour.sRGB_to_XYZ(rgb)
        lab = colour.XYZ_to_Lab(xyz)
        return np.array(lab)
    except Exception as e:
        raise ValueError(f"Color conversion error for #{hex_color}: {str(e)}")

def calculate_color_score(wall_lab, roof_lab, furniture_lab):
    """Calculate comprehensive color compatibility score"""
    # Calculate contrasts using CIEDE2000
    wall_contrast = colour.delta_E(wall_lab, furniture_lab, method='CIE 2000')
    roof_contrast = colour.delta_E(roof_lab, furniture_lab, method='CIE 2000')
    
    # Calculate color harmony
    harmony = 100 - (0.6 * wall_contrast + 0.4 * roof_contrast)
    
    # Final weighted score (60% contrast, 40% harmony)
    return 0.6 * (0.7 * wall_contrast + 0.3 * (100 - roof_contrast)) + 0.4 * harmony

@app.route('/services/color-recommendations', methods=['POST'])
def color_recommendations():
    try:
        if not request.is_json:
            return jsonify({'success': False, 'error': 'Request must be JSON'}), 400
        
        data = request.get_json()
        
        # Validate required fields
        if not data or 'roofColor' not in data or 'wallColor' not in data:
            return jsonify({'success': False, 'error': 'Both roofColor and wallColor are required'}), 400
            
        roof_hex = data['roofColor'].lstrip('#')
        wall_hex = data['wallColor'].lstrip('#')
        category = data.get('category', 'LivingRoomFurniture')

        # Validate hex colors
        if len(roof_hex) not in [3, 6] or not roof_hex.isalnum():
            return jsonify({'success': False, 'error': 'Invalid roof color format'}), 400
            
        if len(wall_hex) not in [3, 6] or not wall_hex.isalnum():
            return jsonify({'success': False, 'error': 'Invalid wall color format'}), 400

        # Convert to Lab color space
        try:
            roof_lab = hex_to_lab(roof_hex)
            wall_lab = hex_to_lab(wall_hex)
        except ValueError as e:
            return jsonify({'success': False, 'error': str(e)}), 400

        # Score all furniture colors
        scored_colors = []
        for color in COLOR_DATABASE['furniture_colors']:
            try:
                furniture_lab = np.array(color['lab'])
                score = calculate_color_score(wall_lab, roof_lab, furniture_lab)
                
                scored_colors.append({
                    'name': color['name'],
                    'hex': f"#{color['hex']}",
                    'score': round(score, 2),
                    'roofContrast': round(colour.delta_E(roof_lab, furniture_lab, method='CIE 2000'), 2),
                    'wallContrast': round(colour.delta_E(wall_lab, furniture_lab, method='CIE 2000'), 2),
                    'harmony': round(100 - (0.6 * colour.delta_E(wall_lab, furniture_lab, method='CIE 2000') + 
                                         0.4 * colour.delta_E(roof_lab, furniture_lab, method='CIE 2000')), 2)
                })
            except Exception as e:
                print(f"Skipping color {color['name']} due to error: {str(e)}")
                continue

        # Sort by best score (highest first)
        scored_colors.sort(key=lambda x: -x['score'])

        # Prepare response
        response = {
            'success': True,
            'recommendations': scored_colors[:8],  # Return top 8 recommendations
            'inputColors': {
                'roof': f'#{roof_hex}',
                'wall': f'#{wall_hex}',
                'category': category
            },
            'colorTheory': {
                'algorithm': 'CIEDE2000',
                'weights': {
                    'wallContrast': 0.42,
                    'roofHarmony': 0.18,
                    'overallHarmony': 0.4
                }
            }
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Internal server error: {str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)