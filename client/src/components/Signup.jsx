import React, { useState, useEffect } from 'react';
import { Input } from './ui/input'; // Assuming you're using a custom Input component
import { Button } from './ui/button'; // Custom Button component
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    role: "student" // Default role
  });
  const [additionalInput, setAdditionalInput] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  // Handler for main input fields (common)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handler for additional role-based input fields
  const additionalChangeHandler = (e) => {
    setAdditionalInput({ ...additionalInput, [e.target.name]: e.target.value });
  };

  // Submit handler
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/v1/user/register', { ...input, ...additionalInput }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
          role: "student"
        });
        setAdditionalInput({});
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  // Dynamic fields based on the role
  const renderAdditionalFields = () => {
    switch (input.role) {
      case 'student':
        return (
          <>
            <div>
              <span className='font-medium'>Institute ID</span>
              <Input
                type="text"
                name="instituteId"
                value={additionalInput.instituteId || ""}
                onChange={additionalChangeHandler}
                className="focus-visible:ring-transparent my-2"
              />
            </div>
            <div>
              <span className='font-medium'>Batch</span>
              <Input
                type="text"
                name="batch"
                value={additionalInput.batch || ""}
                onChange={additionalChangeHandler}
                className="focus-visible:ring-transparent my-2"
              />
            </div>
          </>
        );
      case 'alumni':
        return (
          <>
            <div>
              <span className='font-medium'>LinkedIn Profile</span>
              <Input
                type="text"
                name="linkedInProfile"
                value={additionalInput.linkedInProfile || ""}
                onChange={additionalChangeHandler}
                className="focus-visible:ring-transparent my-2"
              />
            </div>
            <div>
              <span className='font-medium'>Current Employer</span>
              <Input
                type="text"
                name="currentEmployer"
                value={additionalInput.currentEmployer || ""}
                onChange={additionalChangeHandler}
                className="focus-visible:ring-transparent my-2"
              />
            </div>
          </>
        );
      case 'institute':
        return (
          <div>
            <span className='font-medium'>University ID</span>
            <Input
              type="text"
              name="universityId"
              value={additionalInput.universityId || ""}
              onChange={additionalChangeHandler}
              className="focus-visible:ring-transparent my-2"
            />
          </div>
        );
      case 'university':
        return (
          <div>
            <span className='font-medium'>University Code</span>
            <Input
              type="text"
              name="universityCode"
              value={additionalInput.universityCode || ""}
              onChange={additionalChangeHandler}
              className="focus-visible:ring-transparent my-2"
            />
          </div>
        );
      case 'admin':
        return (
          <div>
            <span className='font-medium'>Admin Key</span>
            <Input
              type="password"
              name="adminKey"
              value={additionalInput.adminKey || ""}
              onChange={additionalChangeHandler}
              className="focus-visible:ring-transparent my-2"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex items-center w-screen h-screen justify-center'>
      <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8'>
        <div className='my-4'>
          <h1 className='text-center font-bold text-xl'>LOGO</h1>
          <p className='text-sm text-center'>Signup to join our platform</p>
        </div>
        <div>
          <span className='font-medium'>Username</span>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className='font-medium'>Email</span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className='font-medium'>Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className='font-medium'>Role</span>
          <select
            name="role"
            value={input.role}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2 border p-2"
          >
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
            <option value="institute">Institute</option>
            <option value="university">University</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {renderAdditionalFields()}

        {loading ? (
          <Button>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Please wait
          </Button>
        ) : (
          <Button type='submit'>Signup</Button>
        )}
        <span className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
      </form>
    </div>
  );
};

export default Signup;
