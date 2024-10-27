import { Institute } from '../models/institute.model.js';

export const getAllInstitutes = async (req, res) => {
    try {
        const institutes = await Institute.find({}, 'username _id');
        return res.status(200).json({
            success: true,
            institutes: institutes.map(institute => ({
                id: institute._id,
                name: institute.username
            }))
        });
    } catch (error) {
        console.error("Error fetching institutes:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve institutes."
        });
    }
};
