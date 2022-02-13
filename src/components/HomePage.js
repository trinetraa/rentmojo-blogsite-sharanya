import { useState, useEffect } from "react";
import Loader from "./Loader";
import UsersTable from "./UsersTable";

export default function HomePage(){
    const [userData, setUserData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [displayData, setDisplayData] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchCompany, setSearchCompany] =useState("");
    const [userId, setUserId] = useState(1);

    useEffect(()=>{
        getUserData();
    }, [])

    useEffect(()=>{
        filterSearch();
    }, [searchName, searchCompany])
    
    const getUserData = async ()=>{
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const results = await response.json();
            setUserData(results);
            console.log(results);
            setDisplayData(results);
            setIsDataLoaded(true);
            console.log(userData);
        }
        catch(e){
            console.log(e);
        }
    }
    const filterSearch = ()=>{
        let temp = [];
        if(searchName=="" && searchCompany==""){
            setDisplayData(userData);
        }
        if(searchName!=""){
            temp = displayData.filter((el)=>{
                return (el.name.toLowerCase().indexOf(searchName.toLowerCase())!=-1)
            }) 
        setDisplayData(temp);
        }
        if(searchCompany!=""){
            temp = displayData.filter((el)=>{
                return (el.company.name.toLowerCase().indexOf(searchCompany.toLowerCase())!=-1) 
            })
            setDisplayData(temp);
        }
        if(searchName!="" && searchCompany==""){
            temp = userData.filter((el)=>{
                return (el.name.toLowerCase().indexOf(searchName.toLowerCase())!=-1)
            }) 
            setDisplayData(temp);
        }
        if(searchName=="" && searchCompany!=""){
            temp = userData.filter((el)=>{
                return (el.name.toLowerCase().indexOf(searchCompany.toLowerCase())!=-1)
            }) 
            setDisplayData(temp);
        }
    }

    const handleFilterChange = (category, filterVal)=>{
        console.log("in handle change");
            if(category=="name") {
                setSearchName(filterVal);
            }
            else{
                setSearchCompany(filterVal);
            }
    }

    if(!isDataLoaded){
        return(
            <div className="home-page">
                <Loader/>
            </div>
        )
    }
    else{
        return(
            <div className="home-page">
                <h1 className='page-header'>User List - HOME PAGE</h1>
                <br/><br/>
                <div className="filters">
                    <div className="name-filter">
                        <input placeholder="Search User" value={searchName} name="name-search" id="name-search" onChange={(e)=>{handleFilterChange("name", e.target.value)}}/>
                    </div>
                    <div className="company-filter">
                        <input placeholder="Search Company" value={searchCompany} name="company-search" id="company-search" onChange={(e)=>{handleFilterChange("company", e.target.value)}}/>
                    </div>
                </div>
                <div className="table-container">
                    <table className="user-table">
                        <thead className="table-rows">
                            <tr className="">
                                <td className="users-name">Name</td>
                                <td className="users-company">Company</td>
                                <td className="users-blog">Blog</td>
                            </tr>
                        </thead>
                        <tbody className="user-table-body">
                            {
                                displayData.map((el)=>{
                                    return <UsersTable key={el.id} id={el.id} name={el.name} company={el.company.name}/>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            
        )
    
    }
}