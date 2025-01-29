import React, { useState , useEffect} from 'react';
import './SignUp.scss';
import { useNavigate } from 'react-router-dom';
import cities from '../../objects/cities';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();


    console.log(selectedCity)
        useEffect(() => {
            console.log(selectedCity)
        },[selectedCity])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !name || !surname || !password) {
            setError('All fields are required.');
            return;
        }

        const userData = { email, name, surname, password };

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert('User registered successfully!');
                setEmail('');
                setName('');
                setSurname('');
                setPassword('');
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.message || 'An error occurred.');
            }
        } catch (error) {
            setError('An error occurred.');
        }
    };

    return (
        <div className="sign-up">
            <h2>Sign Up</h2>


            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>

                <div className="form-group">
                    <label>Surname</label>
                    <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Enter your surname"
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <div className="form-group">
                <label>City</label>
                <select onClick={(e) => setSelectedCity(e.target.value)}>
                    {cities.map((city) => (
                        <option key={city.id} value={city.name}  >
                            {city.name}
                        </option>
                    ))}
                </select>
                </div>

                <button type="submit">Sign Up</button>

            </form>
        </div>
    );
};

export default SignUp;
