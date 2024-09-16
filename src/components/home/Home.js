import "./Home.css";
import dayjs from 'dayjs';
import { useState } from "react";
import { Dayjs } from "dayjs";

function Home() {
const [ clicked, setClicked] = useState(false);
const [ register, setRegister] = useState('');
const [ daily, setDaily] = useState('');
const [ paid, setPaid] = useState('');
const [ deposit, setDeposit] = useState('');
const [ endUpdate, setEndUpdate] = useState('');
const [ expectedPay, setExpectedPay] = useState('');
const [ deficit, setDeficit] = useState('');
const [ totalUpgrade, setTotalUpgrade] = useState('');
const [ daysAlert, setDaysAlert] = useState('');
const [alert, setAlert] = useState(false)
const [more, setMore] = useState(false)

//More button handles
function openMore(){
  setMore(true)
}
function closeMore(){
  setMore(false)
}

function toggleSidebar() {
  setClicked(!clicked);
}

function showAlert(){
  setAlert(true)
}
function hideAlert(){
  setAlert(false)
}

function handleCalculation(){
  const date = dayjs(register);
  const endDate = date.add(112, 'days')
  const formattedEndDate = endDate.format('YYYY-MM-DD');
  if (!register) {
    alert("Date is required");
    return;
  }else{
    setEndUpdate(formattedEndDate);
  }
 const timeDefference = endDate - date;
 const numDays = timeDefference / (1000*60*60*24);

 let upgradeAmount = 0;
 if(!isNaN(daily) && daily.trim() !== '') {
    upgradeAmount = (numDays * parseInt(daily));
    setExpectedPay(upgradeAmount);
 }else{
  setExpectedPay('');
 }

 let totalPay = 0;
 if(!isNaN(deposit) && deposit.trim() !== '') {
  totalPay = (upgradeAmount + parseInt(deposit));
  setTotalUpgrade(totalPay);
 }else{
  setTotalUpgrade('');
 }
let lessAmount = 0;
if(!isNaN(paid) && paid.trim() !== '') {
  lessAmount = (totalPay - parseInt(paid));
  setDeficit(lessAmount);
}else{
  setDeficit('');
}
let leftDays = 0;
if(!isNaN(daily) && daily.trim() !== '') {
  leftDays = (lessAmount / parseInt(daily)+ ' ' + 'days');
  setDaysAlert(leftDays);

}


}


  return (
    <>
        <ul className={clicked ? "#sidebar show" : "#sidebar"} id="sidebar">
         <li><a href="/"><i className="fa fa-home"></i><span className="ps-3 ">Dashboard</span></a></li>
         <li><i className="fa fa-comment"></i><span className="ps-3 ">Messages</span></li>
         <li data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              <i className="fa fa-pencil"></i><span className="ps-3">Add note</span>
            </li>
         <li onClick={showAlert}><i className="fa fa-exclamation-circle"></i><span className="ps-3 ">Alert</span></li>
        </ul>
      
      <header>
        <div className="conatiner-fluid nav">
          <div className="logo">
            <div onClick={toggleSidebar} className='w3-button'>
              <i 
              className={clicked ? 'fa fa-times w3-xlarge ' : 'fa fa-bars w3-xlarge'} 
            ></i>
            </div>
            
            <a href="/">PORSHTECH</a>
          </div>
          <span>
            <h4>Simplified Computation</h4>
          </span>
          <ul id="nav-links">
            <li className="w3-button w3-round" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Note
            </li>
            <li onClick={openMore} className="w3-button w3-round">
              More
            </li>
          </ul>
        </div>
      </header>
      <div className="conatiner">
        <div className="row">
          <div className="col-md-5 input-div py-4">
            <label for="registration">
              Registration date{" "}
              <span>
                <i className="fa fa-question-circle"></i>
              </span>
            </label>
            <br />
            <input
              type="date"
              id="registration"
              value={register}
              onChange ={(e)=>setRegister(e.target.value)}
              className="w3-input w3-round-large "
            />
            <br />
           
            <label for="daily">
              Daily Payment{" "}
              <span>
                <i className="fa fa-question-circle"></i>
              </span>
            </label>
            <br />
            <input type="text" 
            id="daily"
            value={daily}
              onChange ={(e)=>setDaily(e.target.value)}
            className="w3-input w3-round-large " />
            <br />
          
            <label for="totalPaid">
              Total Paid{" "}
              <span>
                <i className="fa fa-question-circle"></i>
              </span>
            </label>
            <br />
            <input
              type="text"
              id="totalPaid"
              value={paid}
              onChange ={(e)=>setPaid(e.target.value)}
              className="w3-input w3-round-large "
            />
            <br />
           
            <label for="deposit">
              Deposit paid{" "}
              <span>
                <i className="fa fa-question-circle"></i>
              </span>
            </label>
            <br />
            <input
              type="text"
              id="totalPaid"
              value={deposit}
              onChange ={(e)=>setDeposit(e.target.value)}
              className="w3-input w3-round-large "
            />
            <br />
            
            

            <div className="text-center ">
              <button onClick={ handleCalculation } className="btn btn-success btn-sm px-4">Submit</button>
            </div>
          </div>
          <div className="col-md-6 input-div py-4">
            <label htmlFor="expiry">End of Upgrade Period(112 days)</label><br />
            <input type="date" 
              disabled
              value={endUpdate}
              onChange ={(e)=>setEndUpdate(e.target.value)}
            className="w3-input w3-round" /><br />

            <label htmlFor="expiry">Total Upgrade Amount</label><br />
            <input type="text"
              disabled
              value={totalUpgrade}
              onChange ={(e)=>setTotalUpgrade(e.target.value)}
              className="w3-input w3-round" /><br />

            <label htmlFor="expiry">Expected pay within upgrade period(112 days)</label><br />
            <input type="text"
             disabled
              value={expectedPay}
              onChange ={(e)=>setExpectedPay(e.target.value)}
             className="w3-input w3-round" /><br />
             
            <label htmlFor="expiry">Deficit(Amount to be added)</label><br />
            <input type="text"
              disabled
              value={deficit}
              onChange ={(e)=>setDeficit(e.target.value)}
              className="w3-input w3-round" /><br/>
          </div>
        </div>
      </div>
      <div className="w-25 alert alert-primary daysLeft">
         {daysAlert}
      </div> 
      {/* Modal section */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel"><span><i className="fa fa-pencil"></i></span>Add note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
                <div className="modal-body">
                <textarea name="note" rows="6" id="note" className="form-control border-0 " placeholder="Add comment here"></textarea>
              </div>
              <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-success">Add</button>
      </div>
    </div>
  </div>
</div>

{/* Alert Section */}
{alert && (
  <div className="w3-modal" style={{display: 'block'}}>
    <div class="alert alert-danger w3-modal-content alert-modal py-3" role="alert">
      This site is not connected to any live sunking database thus changes made by the organization won't reflect unless added manually!
      <button onClick={hideAlert} className="close-icon w3-red w3-hover-pale-red w3-circle">
        <i className="fa fa-times"></i>
      </button>
    </div>
  </div>   
)}

{/* More section under development */}
{more && (
  <div className="w3-modal" style={{display: 'block'}}>
  <div class="alert alert-primary ps-3 w3-modal-content d-flex justify-content-between align-items-center " role="alert">
    Coming Up soon😀 !
    <div onClick={closeMore} className="w3-button w3-circle">
      <i className="fa fa-times"></i>
    </div>
  </div>
</div> 
)}

<footer>
  <div>
    <h6>&copy; {dayjs().year()} <span className="fst-italic">Porshtech</span> </h6>
  </div>
</footer>
</>
  );
}

export default Home;
