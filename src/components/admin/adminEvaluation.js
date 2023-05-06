import { useEffect, useState } from "react";
import TestComp from "../test/TestComp";
import { useDispatch, useSelector } from "react-redux";
import { getTests } from "../../store/AdminDashboardActions";

const AdminEvaluation = () => {
  const tests=useSelector(state=>state.adminDashboard.tests);
  const dispatch=useDispatch();
  const [uid,setUid]=useState("");
  const [loading,setLoading]=useState(false);
  
  const user=JSON.parse(localStorage.getItem('userInfo'));
  
  
useEffect(()=>{
  if(tests.length===0)
    fetchTests();
},[]);

useEffect(()=>{
  console.log(tests);
},[tests]);


const fetchTests=()=>{
    dispatch(getTests(user._id));
}

  return(
<div className="container-fluid mb-5">

    <div className="row mt-4 px-5">
      <div className="col-12">
          <div className="h5 text-light">Pending Interview Evaluations</div>
          <small className="text-light">List of all pending Interview Evaluations</small>
      </div>
    </div>

    {/* <div className="row mt-3 px-5">
        <div className="col-12">
                <div className="h5 text-light">Pending Interview evaluations</div>
        </div>
    </div> */}

    <div className="row px-5">
      {tests.length === 0 && 
        <div className="text-center text-secondary mt-5">
          You don't have any pending Interview evaluations.
        </div>
      }
      {tests.map((test,index)=>{
            if(test.state==='pending')
            return <TestComp testobj={test} index={index} titleUrl={'/admin/adminPendingSubmissions'}/>
          })
          }
          
    </div>

        </div>
    );
}

export default AdminEvaluation;