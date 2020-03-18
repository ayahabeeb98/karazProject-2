import React from 'react';

const TableResult = ({users , loading}) => {
    if (loading) {
        return <h3 className="text-center">Loading ...</h3>
    }

    const randomDevice = () => {
        return Math.round(Math.random())
    };

    const currentUsers = users.map(user=>{
        if(user.google){
            return {...user,type:"Google"}
        }else if(user.email){
            return {...user,type:"Email"}

        }else if(user.facebook){
            return {...user,type:"Facebook"}
        }else {
            return {...user,type:"Phone"}
        }
    });

  return (
      <>
          {currentUsers.map((user,i) => {
              return(<tr key={i} className="text-center">
                      <th scope="row" className="border">{i+1}</th>
                      <td>{user.name}</td>
                      <td>{user.location ? '' : "gaza"}</td>
                      <td>{user.date.slice(0,19).replace("T", " ")}</td>
                      <td>{user.type}</td>
                      <td>{randomDevice() === 1 ? "Desktop" : "Mobile"}</td>
                      <td>:</td>
                  </tr>
              )
          })}
      </>
  )
};

export default TableResult;