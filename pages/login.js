// pages/login.js
import { useState } from 'react';
import Link from 'next/link';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Implement your login logic here
//     console.log(email, password); // For now, just log the credentials

//     // Simulated login logic (replace with real authentication)
//     if (email !== 'test@example.com' || password !== 'password') {
//       setError('Invalid email or password');
//     } else {
//       // Redirect on successful login
//       window.location.href = '/dashboard'; // Adjust to your actual route
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       {/* Logo in the top-left corner */}
//       <div className="absolute top-1 left-4">
//         <img src="/logo.png" alt="Logo" className="h-16 w-auto" /> {/* Adjusted logo size */}
//       </div>

//       {/* Form Section (left half) */}
//       <div className="w-1/2 p-8 flex flex-col justify-center relative">
//         {/* Form fields start here */}
//         <h1 className="text-center text-2xl font-bold ">Welcome back </h1>
//         <h2 className="text-center text-2xl text-gray-600 mb-6">Login to Continue </h2>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Error message display */}
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block mb-1 text-gray-600">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-md"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 text-gray-600">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-md"
//               placeholder="Enter your password"
//             />
//           </div>

//           {/* Forgot password link */}
//           <div className="text-right">
//             <span className="text-sm text-blue-600 cursor-pointer">
//               Forgot password?
//             </span>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#009688] text-white py-2 rounded-md"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-center">
//           Don't have an account? <Link href="/signup" className="text-blue-600">Signup</Link>
//         </p>
//       </div>

//       {/* Image Section (right half, embedded in the same container) */}
//       <div className="w-1/2">
//         <img
//           src="/Frame 24.png"
//           alt="Login Illustration"
//           className="object-cover w-full h-full" /> {/* Image filling the right half */}
//       </div>
//     </div>
//   );
// }
