import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container d-flex ">
        <h2 style={{color: "rgb(30, 48, 80)"}}>Store</h2>
        <Link to="/" className="registen-nav" style={{ padding: "15px 25px" ,height:"63px",textAlign:"center",marginTop:"12px"}}>
          Go To Website
        </Link>
      </div>
    </div>
  );
}
