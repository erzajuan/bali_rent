import {Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { detailCarRent, updateCarRent } from "../../fetches/carAxios"
import { detailCarBrand } from "../../fetches/brandAxios"

const EditCar = (props) => {
    const {idCar, handleShowEditCar} = props
    const navigation = useNavigate()
    console.log('idCar:',idCar)

    const [brandNames, setBrandNames] = useState([])
    const detailBrand = () => {
        try{
            detailCarBrand((response) => {
                // console.log('response car brand:',response)
                setBrandNames(response)
            })
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        detailBrand()
    },[])

    const [form, setForm] = useState({
        name:'',
        rentPrice:'',
        plateNumber:'',
        fuelType:'',
        seatCount:'',
        carYear:'',
        brandName:'',
        transmission:'',
        wdType:'',
        status:''
    })
    const [file, setFile] = useState(null)

    const detailCars = () => {
        try{
            detailCarRent((response) => {
                const carsById = response.find((data) => data.id === +idCar)
                console.log('carsById:', carsById)
                console.log('carsById brandId :', carsById.brandId)
                console.log('brandNames detail :', brandNames)
                // const brandNameDetail = brandNames.find((name) => name.id === +carsById.brandId)
                // const brandName = brandNameDetail.brandName
                setForm({
                    name:carsById.name,
                    rentPrice:carsById.rentPrice,
                    plateNumber:carsById.plateNumber,
                    fuelType:carsById.fuelType,
                    seatCount:carsById.seatCount,
                    carYear:carsById.carYear,
                    brandName:carsById.brand.brandName,
                    transmission:carsById.transmission,
                    wdType:carsById.wdType,
                    status:carsById.status
                })
                console.log(carsById)
        })
        
        }
        catch(err){
            console.log(err)
        }
    }
    
    useEffect(() => {
        detailCars();
        // const interval = setInterval(detailCars, 1000)
        // return () => {
        //     clearInterval(interval)
        // }
    },[])


    const handleSubmit = (event) => {
        try{
            event.preventDefault()
            const brandNameDetail = brandNames.find((name) => name.brandName === form.brandName)
            const brandId = brandNameDetail.id
            const data = new FormData()
            data.append("name", form.name)
            data.append("rentPrice", form.rentPrice)
            data.append("plateNumber", form.plateNumber)
            data.append("fuelType", form.fuelType)
            data.append("seatCount", form.seatCount)
            data.append("carYear", form.carYear)
            data.append("brandId", brandId)
            data.append("transmission", form.transmission)
            data.append("wdType", form.wdType)
            data.append("status", form.status)
            data.append("carImage", file)

            updateCarRent(idCar, data, (response) => {
                if(response){
                    handleShowEditCar(idCar, false)
                    navigation('/showcar')               
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <>
        <Typography variant="h4">EditCar</Typography>
        <form onSubmit={handleSubmit}> 
            <Typography sx={{mt:2}}>Upload Image Car</Typography>
            <TextField
                type="file"
                name="upload image car"
                fullWidth
                sx={{mb:4}}
                onChange={(e) => setFile(e.target.files[0])}
            />
            <TextField
                label="Name Car"
                type="text"
                required
                fullWidth
                sx={{mb:4}}
                onChange={(e) => setForm({...form, name:e.target.value})}
                value={form.name}
            />
            <Stack direction={"row"} spacing={2} sx={{mb:4}}>
                <TextField 
                    label="Seat Count"
                    type="text"
                    required
                    fullWidth
                    onChange={(e) => setForm({...form, seatCount:e.target.value})}
                    value={form.seatCount}
                />
                <TextField 
                    label="Fuel Type"
                    type="text"
                    required
                    fullWidth
                    onChange={(e) => setForm({...form, fuelType:e.target.value})}
                    value={form.fuelType}
                />
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{mb:4}}>
                <TextField 
                    label="Car Year"
                    type="text"
                    required
                    fullWidth
                    onChange={(e) => setForm({...form, carYear:e.target.value})}
                    value={form.carYear}
                />
                <TextField 
                    label="Transmission"
                    type="text"
                    required
                    fullWidth
                    onChange={(e) => setForm({...form, transmission:e.target.value})}
                    value={form.transmission}
                />
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{mb:4}}>
                <TextField 
                    label="Brand"
                    type="text"
                    required
                    fullWidth
                    onChange={(e) => setForm({...form, brandName:e.target.value})}
                    value={form.brandName}
                />
                <TextField 
                    label="Wd Type"
                    type="text"
                    required
                    fullWidth
                    onChange={(e) => setForm({...form, wdType:e.target.value})}
                    value={form.wdType}
                />
            </Stack>
            <TextField 
                    label="Plate Number"
                    type="text"
                    required
                    fullWidth
                    sx={{mb: 4}}
                    onChange={(e) => setForm({...form, plateNumber:e.target.value})}
                    value={form.plateNumber}
            />
            <TextField 
                    label="Rent Price"
                    type="text"
                    required
                    fullWidth
                    sx={{mb: 4}}
                    onChange={(e) => setForm({...form, rentPrice:e.target.value})}
                    value={form.rentPrice}
            />
            <TextField 
                    label="Status"
                    type="text"
                    required
                    fullWidth
                    sx={{mb: 4}}
                    onChange={(e) => setForm({...form, status:e.target.value})}
                    value={form.status}
            />
            <Button type="submit" variant="outlined">Save</Button>
            <Button type="button" variant="outlined" sx={{ml:'10px'}} color='warning' onClick={() => handleShowEditCar(idCar, false)}>Back</Button>
        </form>
        </>
    )
}

export default EditCar

/** @type {import('@mui/material').SxProps} */
const styles = {
    paperLogin:{
        padding: 10,
        height: '70vh',
        width:500,
        margin:'0 auto',
        backgroundColor: 'white'
    }
}