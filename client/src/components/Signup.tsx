import 'react';
import './globals.css';

export default function Signup() {
    return (
        <div className="signup-container container mt-5 p-4 border rounded bg-light shadow">
            <h2 className='text-center'>Signup</h2>
            <form>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}