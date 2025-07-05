import logo from '/logo.png'

const Header =() =>{
     return(
        <div className="header">
            
            <div className="logo">
                <img src={logo} alt="logo" />
                 <div className="logo-name">ImpossibleXO</div>
            </div>
            
           
        </div>

     )
}
export default Header