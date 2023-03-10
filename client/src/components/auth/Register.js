import React, { useState } from "react";
import { connect } from "react-redux";
import {Link, Redirect} from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticate }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: ""
	});

	const {name, email, password, password2} = formData;

	const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

	const onSubmit = async (e) => {
		e.preventDefault();
		if(password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({ name, email, password });
		}
	};

	if (isAuthenticate) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<section className="container">
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
			<form className="form" onSubmit={onSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						onChange={onChange}
						   // required
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={onChange}
					// required
					/>
					<small className="form-text">
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={onChange}
						name="password"
						// minLength="6"
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						value={password2}
						onChange={onChange}
						name="password2"
						// minLength="6"
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register"/>
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</section>
	)
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(
	mapStateToProps,
	{ setAlert, register }
)(Register);