import {Box, Button, Typography} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"

const columns = [
    {
        field: 'rowIndex',
        headerName: 'No.',
        width: 65
    },
    {
        field: 'carImage',
        headerName: 'Car',
        minWidth: 350,
        renderCell: (params) => <Box sx={styles.videoColumn}>
            <Box
                component={'img'}
                sx={styles.videoThumbnail}
                src={params.row.carImage}
            />
            <Box sx={styles.carDetails}>
                <Typography sx={styles.carTitle}>{params.row.name}</Typography>
                <Typography sx={styles.carDescription}>
                    {params.row.transmissionType} | {params.row.carYear} | {params.row.statusAvailable}
                </Typography>
            </Box>
        </Box>
    },
    {
        field: 'rentPrice',
        headerName: 'Rent Price',
        minWidth: 150,
        flex: 1

    },
    {
        field: 'seatCount',
        headerName: 'Seat Count',
        minWidth: 120,
        flex: 1
    },
    {
        field: 'fuelType',
        headerName: 'Fuel Type',
        minWidth: 150,
        flex: 1
    },
    {
        field: 'wdType',
        headerName: 'Weel Drive Type',
        minWidth: 150,
        flex: 1
    },
    {
        field: 'plateNum',
        headerName: 'Plate Num',
        minWidth: 150,
        flex:1
    },
    {   
        field: 'id',
        headerName: 'Action',
        minWidth: 300,
        renderCell: (params) => <Box>
            <Box>
                <Button variant="outlined" sx={{mr: 1}}>
                    Edit
                </Button>
                <Button variant="outlined" color="warning">
                    Delete
                </Button>
            </Box>

        </Box>
    }

]

const cars = [
    {
        id:1, name:"Toyota Supra", rentPrice:10000000, plateNum:"D 1 D",
        fuelType:"Gasoline", seatCount:"2", carYear:2020, brandId:1, transmissionType:"MT",
        wdType:"rwd", carImage:"src/assets/thumbnail.jpg", statusAvailable:"ready"
    },
    {
        id:1, name:"Toyota Supra", rentPrice:10000000, plateNum:"D 1 D",
        fuelType:"Gasoline", seatCount:"2", carYear:2020, brandId:1, transmissionType:"Manual",
        wdType:"rwd", carImage:"src/assets/thumbnail.jpg", statusAvailable:"ready"
    }
]

const ShowCar = () => {
    const getRowId = (row) => row.rowIndex
    const getRowIdx = (params) => params.rowIndex + 1

    return(
        <Box>
            <Typography sx={styles.pageTitle} variant="h5">Show Car</Typography>
            <DataGrid
                rows={cars.map((car, index) => ({...car, rowIndex: index+1}))}
                columns={columns}
                pageSize={25}
                rowsPerPageOptions={[25]}
                autoHeight
                rowHeight={70}
                getRowId={getRowId}
                getRowIdx={getRowIdx}
            />
        </Box>
    )
}

export default ShowCar

/** @type {import("@mui/material").SxProps} */
const styles = {
    pageTitle:{
        mb:2
    },
    videoColumn:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    videoThumbnail:{
        width: 120        
    },
    carDetails:{
        ml:2,
    },
    carTitle:{
        fontSize:'0.8rem',
        width: 498,
        textOverflow:'ellipsis',
        whiteSPace:'nowrap',
        overflow:'hidden'
    },
    carDescription:{
        fontSize:'0.7rem',
        color:'neutral.normal',
        width: 490,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'

    }
}