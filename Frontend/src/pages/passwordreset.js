import { useEffect, useState, Fragment } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import axios from "axios";
import '../styles/passwordreset.scss'

// child password gets triggerd when the child forgets the password
const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
    console.log(param);
    const navigate = useNavigate();
	// base url
	const url = `http://localhost:5001/reset/${param.id}/${param.token}`;

	// useEffect triggers a backend call
	
    useEffect(() => {
		const verifyUrl = async () => {
			try {
				let res = await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);


	// does a backend call, to change the password of the child user and navigate to the userLogin page
    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(url, { password });
            console.log(data);
			setMsg(data.message);
			setError("");
			navigate('/login');
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};
	return (
		
    <Fragment>
	{/* lottie animation to the left and form element to enter the password on the right */}
      {validUrl ? (
        <div className="container_register">
          <div className="col-md-3">
			<div className='lottie'>
				<lottie-player
				src="https://assets6.lottiefiles.com/private_files/lf30_eivlwmgd.json"
				background="transparent"
				speed="1"
				loop
				autoplay>
				</lottie-player>
			</div>
          </div>
          <div className="col-md-4 form-right">
            <form className="form-class" onSubmit={handleSubmit}>
              <h1>Add New Password</h1>
              <input
                className="input-form"
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              {error && <div>{error}</div>}
              {msg && <div>{msg}</div>}
              <button className="form-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );

};
export default PasswordReset;