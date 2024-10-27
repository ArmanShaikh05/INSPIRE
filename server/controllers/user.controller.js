import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { Admin } from "../models/admin.model.js";
import { Student } from "../models/student.model.js";
import { Alumni } from "../models/alumni.model.js";
import { Institute } from "../models/institute.model.js";
import { University } from "../models/university.model.js";

export const register = async (req, res) => {
    const { username, email, password, role, ...additionalData } = req.body;

    try {
        // Check if user already exists
        let userExists;
        switch (role) {
            case 'student':
                userExists = await Student.findOne({ email });
                break;
            case 'alumni':
                userExists = await Alumni.findOne({ email });
                break;
            case 'institute':
                userExists = await Institute.findOne({ email });
                break;
            case 'university':
                userExists = await University.findOne({ email });
                break;
            case 'admin':
                userExists = await Admin.findOne({ email });
                break;
            default:
                return res.status(400).json({ message: "Invalid role provided." });
        }

        if (userExists) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user based on the role
        let newUser;
        switch (role) {
            case 'student':
                newUser = new Student({
                    username,
                    email,
                    password: hashedPassword,
                    institute: additionalData.instituteId,
                    batch: additionalData.batch
                });
                break;
            case 'alumni':
                newUser = new Alumni({
                    fullName: username,
                    email,
                    password: hashedPassword,
                    linkedInProfile: additionalData.linkedInProfile,
                    employmentStatus: {
                        currentEmployer: additionalData.currentEmployer
                    },
                    institute: additionalData.instituteId,
                    ...additionalData
                });
                break;
            case 'institute':
                newUser = new Institute({
                    username: username,
                    email,
                    password: hashedPassword,
                    ...additionalData
                });
                break;
            case 'university':
                newUser = new University({
                    username: username,
                    email,
                    password: hashedPassword,
                    universityCode: additionalData.universityCode,
                    ...additionalData
                });
                break;
            case 'admin':
                newUser = new Admin({
                    username,
                    email,
                    password: hashedPassword,
                    adminKey: additionalData.adminKey
                });
                break;
            default:
                return res.status(400).json({ message: "Invalid role." });
        }

        // Save the new user
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully.`,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Server error, please try again later." });
    }
};

export const login = async (req, res) => {
    try {
      const { email, password, role } = req.body;
  
      // Validate the request
      if (!email || !password || !role) {
        return res.status(401).json({
          message: "Email, password, and role are required.",
          success: false,
        });
      }
  
      let user;
  
      // Check for user in the respective role collection
      switch (role) {
        case 'student':
          user = await Student.findOne({ email });
          break;
        case 'alumni':
          user = await Alumni.findOne({ email });
          break;
        case 'institute':
          user = await Institute.findOne({ email });
          break;
        case 'university':
          user = await University.findOne({ email });
          break;
        case 'admin':
          user = await Admin.findOne({ email });
          break;
        default:
          return res.status(400).json({ message: "Invalid role." });
      }
  
      // Check if user exists
      if (!user) {
        return res.status(401).json({
          message: "User not found with the provided credentials.",
          success: false,
        });
      }
  
      // Validate password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({
          message: "Incorrect email or password.",
          success: false,
        });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id, role }, "social", {
        expiresIn: "1d",
      });
  
      // Simplify user data for response
      const responseUser = {
        _id: user._id,
        email: user.email,
        username: user.username,
        role, // Include role in the response
      };
  
      // Set the cookie and return success response
      return res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      }).json({
        message: `Welcome back ${responseUser.username}`,
        success: true,
        user: responseUser,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Server error. Please try again later.",
        success: false,
      });
    }
  };
  
export const logout = async (_, res) => {
    try {
        return res.cookie("token", "", { maxAge: 0 }).json({
            message: 'Logged out successfully.',
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};
export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId).populate({path:'posts', createdAt:-1}).populate('bookmarks');
        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const editProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { bio, gender } = req.body;
        const profilePicture = req.file;
        let cloudResponse;

        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        };
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePicture) user.profilePicture = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            message: 'Profile updated.',
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
    }
};
export const getSuggestedUsers = async (req, res) => {
    try {
        const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select("-password");
        if (!suggestedUsers) {
            return res.status(400).json({
                message: 'Currently do not have any users',
            })
        };
        return res.status(200).json({
            success: true,
            users: suggestedUsers
        })
    } catch (error) {
        console.log(error);
    }
};
export const followOrUnfollow = async (req, res) => {
    try {
        const followKrneWala = req.id; // patel
        const jiskoFollowKrunga = req.params.id; // shivani
        if (followKrneWala === jiskoFollowKrunga) {
            return res.status(400).json({
                message: 'You cannot follow/unfollow yourself',
                success: false
            });
        }

        const user = await User.findById(followKrneWala);
        const targetUser = await User.findById(jiskoFollowKrunga);

        if (!user || !targetUser) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }
        // mai check krunga ki follow krna hai ya unfollow
        const isFollowing = user.following.includes(jiskoFollowKrunga);
        if (isFollowing) {
            // unfollow logic ayega
            await Promise.all([
                User.updateOne({ _id: followKrneWala }, { $pull: { following: jiskoFollowKrunga } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $pull: { followers: followKrneWala } }),
            ])
            return res.status(200).json({ message: 'Unfollowed successfully', success: true });
        } else {
            // follow logic ayega
            await Promise.all([
                User.updateOne({ _id: followKrneWala }, { $push: { following: jiskoFollowKrunga } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $push: { followers: followKrneWala } }),
            ])
            return res.status(200).json({ message: 'followed successfully', success: true });
        }
    } catch (error) {
        console.log(error);
    }
}