import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
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
    role: "student"
  });
  const [additionalInput, setAdditionalInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [institutes, setInstitutes] = useState([]);
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (input.role === 'alumni') {
      axios.get('http://localhost:3000/api/v1/institute/getAllInstitute')
        .then(res => {
          setInstitutes(res.data.institutes);
        })
        .catch(err => console.error("Error fetching institutes:", err));
    }
  }, [input.role]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const additionalChangeHandler = (e) => {
    setAdditionalInput({ ...additionalInput, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        input.role === 'alumni'
          ? 'http://localhost:3000/api/v1/alumni/register'
          : 'http://localhost:3000/api/v1/user/register',
        { ...input, ...additionalInput },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({ username: "", email: "", password: "", role: "student" });
        setAdditionalInput({});
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const renderAdditionalFields = () => {
    switch (input.role) {
      case 'student':
        return (
          <>
            <label className='font-medium'>Institute ID</label>
            <Input
              type="text"
              name="instituteId"
              value={additionalInput.instituteId || ""}
              onChange={additionalChangeHandler}
              className="focus-visible:ring-transparent my-2"
            />
            <label className='font-medium'>Batch</label>
            <Input
              type="text"
              name="batch"
              value={additionalInput.batch || ""}
              onChange={additionalChangeHandler}
              className="focus-visible:ring-transparent my-2"
            />
          </>
        );
      case 'alumni':
        return (
          <>
            <label className='font-medium'>LinkedIn Profile</label>
            <Input
              type="text"
              name="linkedInProfile"
              value={additionalInput.linkedInProfile || ""}
              onChange={additionalChangeHandler}
              className="focus-visible:ring-transparent my-2"
            />
            <label className='font-medium'>Institute</label>
            <select
              name="instituteId"
              value={additionalInput.instituteId || ""}
              onChange={additionalChangeHandler}
              className="focus-visible:ring-transparent my-2 border p-2 w-full"
            >
              <option value="">Select Institute</option>
              {institutes.map(institute => (
                <option key={institute.id} value={institute.id}>
                  {institute.name}
                </option>
              ))}
            </select>
          </>
        );
      case 'institute':
        return (
          <>
          <label className='font-medium'>University ID</label>
          <Input
            type="text"
            name="universityId"
            value={additionalInput.universityId || ""}
            onChange={additionalChangeHandler}
            className="focus-visible:ring-transparent my-2"
          />
          </>
        );
      case 'university':
        return (
          <>
          <label className='font-medium'>University Code</label>
          <Input
            type="text"
            name="universityCode"
            value={additionalInput.universityCode || ""}
            onChange={additionalChangeHandler}
            className="focus-visible:ring-transparent my-2"
          />
          </>
        );
      case 'admin':
        return (
          <>
          <label className='font-medium'>Admin Key</label>
          <Input
            type="password"
            name="adminKey"
            value={additionalInput.adminKey || ""}
            onChange={additionalChangeHandler}
            className="focus-visible:ring-transparent my-2"
          />
          </>
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
        <label className='font-medium'>Username</label>
        <Input
          type="text"
          name="username"
          value={input.username}
          onChange={changeEventHandler}
          className="focus-visible:ring-transparent my-2"
        />
        <label className='font-medium'>Email</label>
        <Input
          type="email"
          name="email"
          value={input.email}
          onChange={changeEventHandler}
          className="focus-visible:ring-transparent my-2"
        />
        <label className='font-medium'>Password</label>
        <Input
          type="password"
          name="password"
          value={input.password}
          onChange={changeEventHandler}
          className="focus-visible:ring-transparent my-2"
        />
        <label className='font-medium'>Role</label>
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
