export const getColorRecommendations = async (req, res) => {
    try {
        const { roofColor, wallColor, category } = req.body;

        if (!roofColor || !wallColor) {
            return res.status(400).json({
                success: false,
                error: 'Both roofColor and wallColor are required'
            });
        }

        // Validate hex colors
        const hexRegex = /^([0-9A-Fa-f]{3}){1,2}$/;
        if (!hexRegex.test(roofColor) || !hexRegex.test(wallColor)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid color format. Please provide 3 or 6 character hex values without #'
            });
        }


        const flaskUrl = 'http://localhost:5000/services/color-recommendations';
        
        let response;
        try {
            response = await fetch(flaskUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    roofColor, 
                    wallColor, 
                    category: category || 'LivingRoomFurniture' 
                })
            });
            
           
            if (!response) {
                throw new Error('No response from color recommendation service');
            }

            // Get the response text to handle both JSON and HTML errors
            const responseText = await response.text();
            
            try {
                // Try to parse as JSON
                const data = JSON.parse(responseText);
                
                if (!response.ok) {
                    return res.status(response.status).json({
                        success: false,
                        error: data.error || 'Color recommendation service error'
                    });
                }

                return res.status(200).json({
                    success: true,
                    recommendations: data.recommendations || []
                });
                
            } catch (parseError) {
                // If parsing as JSON fails, it's probably an HTML error page
                console.error('Flask API returned non-JSON response:', responseText);
                throw new Error(`Color recommendation service returned invalid response: ${response.status} ${response.statusText}`);
            }
            
        } catch (fetchError) {
            console.error('Failed to call color recommendation service:', fetchError);
            throw new Error(`Could not connect to color recommendation service: ${fetchError.message}`);
        }

    } catch (error) {
        console.error('Color recommendation error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal server error'
        });
    }
};