import ownerImage from "../images/owner.jpg";


function AboutUs(props) {
    const openPage = (event) => {
        if (event.target.innerHTML === "adarshmishra812003@gmail.com") {
            window.location.href = "https://mail.google.com/mail/?view=cm&fs=1&to=adrshmishra812003@gmail.com";
        } else if (event.target.innerHTML === "adarsh-mishra-469811205") {
            window.location.href = "https://www.linkedin.com/in/adarsh-mishra-469811205/";
        }
        // console.log("called",event.target.innerHTML)
    }
    return (
        <div className="container text-center mt-4">
            <h1 className="text-center my-3" >About Us</h1>
            <img src={ownerImage} id="ownerImage" alt="owner" />
            <h3>Adarsh Mishra</h3>
            <button className="btn btn-primary mt-2 mb-3" onClick={openPage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"></path>
                </svg>
                <span className="mx-2">adarshmishra812003@gmail.com</span>
            </button>
            <button className="btn btn-primary mx-3 mt-2 mb-3" onClick={openPage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
                </svg>
                <span className="mx-2">adarsh-mishra-469811205</span>
            </button>
            <hr />
            <p>My name is Adarsh Siddharth Shankar Mishra from Thane .
                I am pursuing Bsc.IT from University of MUMBAI expecting 2023.I am improving my knowledge and learning some skills.
                My strength is I am hard-work person then self-motivater self- confidence and concentration my career growth.
                My short-term goal is get a good job in reputed company.</p>
            <p><span className="text-danger" style={{fontSize:"20px"}}>Note:</span>The data of pokemon are get from <a href="https://pokeapi.co/" style={{color:"orange",fontSize:"25px"}}>pokeapi</a>.<br/>For any issue contact me on my email.</p>
        </div>
    );
}

export default AboutUs;


