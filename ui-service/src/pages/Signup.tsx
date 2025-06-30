import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn, useAuth } from '../context/AuthContext';
import { signupUser } from '../api/auth';



export function Signup({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [role, setRole] = useState('CUSTOMER');
    const { login } = useAuth();
    const navigate = useNavigate();
  
    if(isUserLoggedIn()){
        navigate('/dashboard');
      }
  
    const handleSignup = async () => {
      try {
        if(password!==password2){
          alert("Password and confirm password values dont match");
          return;
        }
        const user = await signupUser(email, password, role);
        login(user);
        navigate('/dashboard');
      } catch (err) {
        alert('Signup failed');
      }
    };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Create new account</CardTitle>
              <CardDescription>
                Enter your details below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password2">Password</Label>
                    </div>
                    <Input id="password2" type="password" required onChange={(e)=> setPassword(e.target.value)}/>
                  </div>

                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Confirm Password</Label>
                    </div>
                    <Input id="password" type="password" required onChange={(e)=> setPassword2(e.target.value)}/>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full" onClick={handleSignup}>
                      Login
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <a href="/login" className="underline underline-offset-4">
                    Log in
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

  )
}

export default Signup;