import React, { useState } from 'react'

const Table = (props) => {
  const { data } = props
  const [search, setSearch] = useState("")
  var searchData = data.filter((item) => {
    return search.toLocaleLowerCase() === ""
      ? item
      : item.city.toLocaleLowerCase().includes(search) 
      || item.country.toLocaleLowerCase().includes(search);
  })
  return (
    <div>
      <div className='row d-flex justify-content-end'>
        <div class="col-md-3 mb-1 ">
          <input type="text" class="form-control" onChange={(e) => setSearch(e.target.value)} name="" id="" aria-describedby="helpId" placeholder="Search" />
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">City</th>
            <th scope="col">Country</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
          </tr>
        </thead>
        <tbody>
          {searchData.map((row)=>(
            <tr>
            <td>{row.city}</td>
            <td>{row.country}</td>
            <td>{row.latitude}</td>
            <td>{row.longitude}</td>
          </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  )
}

export default Table
