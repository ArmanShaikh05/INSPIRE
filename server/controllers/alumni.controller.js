import bcrypt from "bcryptjs";
import { Alumni } from "../models/alumni.model.js";
import Profile from "../models/profileModel.js";
import getProfile from "../profile/profile.js";
import { getUserHandle, getHourDifference } from "../utils/utils.js";

export const registerAlumni = async (req, res, next) => {
  try {
    const { username, name, email, password, linkedInProfile, instituteId } = req.body;

    // Validate required fields
    if (!username || !email || !password || !linkedInProfile || !instituteId) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    // Check if the email or LinkedIn profile is already registered
    const existingAlumni = await Alumni.findOne({
      $or: [{ email }, { linkedInProfile }],
    });
    if (existingAlumni) {
      return res.status(409).json({ message: "Alumni already registered with this email or LinkedIn profile." });
    }

    // Generate a hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Process LinkedIn profile or user handle
    let profile = await Profile.findOne({ publicIdentifier: getUserHandle(linkedInProfile) });

    // If profile doesn't exist or needs updating (older than 12 hours), fetch it from LinkedIn
    if (!profile || getHourDifference(new Date(), new Date(profile.updatedAt)) > 12) {
      profile = await getProfile(linkedInProfile);
      if (!profile) {
        return res.status(404).json({ message: "Could not retrieve LinkedIn profile data." });
      }

      // Save or update the LinkedIn profile in the Profile model
      if (!profile._id) {
        profile = await Profile.create(profile);
      } else {
        await profile.save();
      }
    }

    // Create and save the new alumni record
    const newAlumni = new Alumni({
      username,
      name,
      email,
      password: hashedPassword,
      linkedInProfile,
      institute: instituteId,
      employmentStatus: {
        currentEmployer: profile.experiences[0]?.title || "",
        jobTitle: profile.experiences[0]?.subtitle || "",
        careerPath: profile.headline || "",
        yearsOfExperience: profile.experiences.length,
        expertiseAreas: profile.skills?.skills.map(skill => skill.title) || [],
      },
      contactInformation: {
        phone: profile.contactInformation?.phone || "",
        address: profile.contactInformation?.address || "",
      },
      badges: [],  // Initialize empty badges array
      rankings: { totalPoints: 0, currentRank: "New" }, // Default ranking
    });

    await newAlumni.save();

    // Return a success response with the saved alumni data
    res.status(201).json({ message: "Alumni registered successfully.", alumni: newAlumni });

  } catch (error) {
    console.error("Error registering alumni:", error);
    next(error);
  }
};
