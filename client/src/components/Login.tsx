import 'react';
import 'react-dom';
import 'react-bootstrap';

export default function Login() {
    return (
        <div className="login-container container mt-5 p-4 border rounded bg-light shadow">
            <h2 className='text-center'>Login</h2>
            <form>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}