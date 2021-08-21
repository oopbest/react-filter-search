import React ,{ useState  , useEffect} from 'react';
import axios from 'axios';

export default function Search() {
    const [data ,setData] = useState([]);
    const [filtered ,setFilterd] = useState([]);
    const [result , setResult] = useState("");

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get('https://api.publicapis.org/categories');
                setData(res.data);
                setFilterd(res.data);
            }catch(err){
                throw new Error(err);
            }
        };
        fetchData(); 
    },[]);

    useEffect(()=> {
        //const results = filtered.filter(res => res.toLowerCase().includes(result)); 
        const results = filtered.filter(res => res.includes(result)); 
        setData(results)
    } ,[result,filtered])
    //console.log(data)

    const onChange =(e)=> {
        setResult(e.target.value);
    }

    return (
    <div className="container">
        <div className="d-grid gap-2 col-6 mx-auto mt-3">
            <input className="form-control"
                type="text"
                placeholder="Search Here .."
                value={result}
                onChange={onChange}
            />

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value,index) => {
                        return(
                            <tr key={index}>
                                <td>{value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div> 
    </div>
    )  
}