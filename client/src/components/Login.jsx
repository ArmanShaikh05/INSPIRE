import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "student" // Default role
    });
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:3000/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                // Redirect based on the role of the user
                switch (res.data.user.role) {
                    case 'student':
                        navigate('/student-dashboard');
                        break;
                    case 'alumni':
                        navigate('/alumni-dashboard');
                        break;
                    case 'institute':
                        navigate('/institute-dashboard');
                        break;
                    case 'university':
                        navigate('/university-dashboard');
                        break;
                    case 'admin':
                        navigate('/admin-dashboard');
                        break;
                    default:
                        navigate('/');
                }
                toast.success(res.data.message);
                setInput({
                    email: "",
                    password: "",
                    role: "student"
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className='flex items-center w-screen h-screen justify-center'>
            <form onSubmit={loginHandler} className='shadow-lg flex flex-col gap-5 p-8'>
                <div className='my-4'>
                    <h1 className='text-center font-bold text-xl'>LOGO</h1>
                    <p className='text-sm text-center'>Login to access your dashboard</p>
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
                {
                    loading ? (
                        <Button>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type='submit'>Login</Button>
                    )
                }

                <span className='text-center'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
            </form>
        </div>
    );
};

export default Login;
