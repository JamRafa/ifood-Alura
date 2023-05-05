import { useEffect, useState } from "react"
import IPrato from "../../../interfaces/IPrato"
import axios from "axios"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
import { Button } from "@mui/base"


const AdminPratos = () => {
    
    const [pratos, setPratos] = useState<IPrato[]>([])
    
    useEffect(() => {
        axios.get<IPrato[]>("http://localhost:8000/api/v2/pratos/")
        .then(response => setPratos(response.data))
        .catch(err => console.log(err))
    }, [])
    
    const deletarPrato = (id: number) => {
        axios.delete(`http://localhost:8000/api/v2/pratos/${id}/`)
        .then(() => {
            const listaPratos = pratos.filter(prato => prato.id !== id)
            setPratos([...listaPratos]) 
        })
        .catch(err => console.log(err))
    }

    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            nome
                        </TableCell>
                        <TableCell>
                            tag
                        </TableCell>
                        <TableCell>
                            imagem
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Deletar
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato => <TableRow key={prato.id}>
                        <TableCell>
                            {prato.nome}
                        </TableCell>
                        <TableCell>
                            {prato.tag}
                        </TableCell>
                        <TableCell>
                            [<a href={prato.imagem}>Imagem</a>]
                        </TableCell>
                        <TableCell>
                            <Link to={`/admin/pratos/${prato.id}/`}>Editar</Link>
                        </TableCell>
                        <TableCell>
                            <Button onClick={()=> deletarPrato(prato.id)}>Deletar</Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default AdminPratos