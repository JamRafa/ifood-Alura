import { useEffect, useState } from "react"
import { Paper, Table, TableContainer, TableBody, TableHead, TableRow, TableCell, Button } from "@mui/material"
import './admin.css'
import IRestaurante from "../../../interfaces/IRestaurante"
import axios from "axios"
import { IPaginacao } from "../../../interfaces/IPaginacao"
import { Link } from "react-router-dom"

const AdminisracaoRestaurante = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [proximaPagina, setProximaPagina] = useState('')
    const [paginaAnterior, setPaginaAnterior] = useState('')
    

    useEffect(() => {
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
            .then(response => {
                setRestaurantes(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    
    const paginacao = (url: string) => {
        axios.get<IPaginacao<IRestaurante>>(url)
        .then(response => {
            setProximaPagina(response.data.next)
            setPaginaAnterior(response.data.previous)
        })
        .catch(err => {
            console.log('err')
        })
    }

    const deletar = (id: number) =>{
        axios.delete<IPaginacao<IRestaurante>>(`http://localhost:8000/api/v2/restaurantes/${id}/`)
        .then(() => {
            const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== id)
            setRestaurantes([...listaRestaurante])
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    return (
        <TableContainer component={Paper}>
            <Button className="botao-novo" color="success" variant="outlined">
                <Link to={"/admin/restaurantes/novo"}>Novo</Link>
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
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
                    {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                        <TableCell>
                            link [<Link to={`/admin/restaurantes/${restaurante.id}`} >Editar</Link>]
                        </TableCell>
                        <TableCell>
                            {<Button 
                                color="error"
                                variant="outlined"
                                onClick={() => deletar(restaurante.id)}>Deletar</Button>}
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        {<button onClick={() => paginacao(proximaPagina)} disabled={!paginaAnterior}>Proxima Página</button>}
        {<button onClick={() => paginacao(paginaAnterior)} disabled={!proximaPagina}>Página anterior</button>}
        </TableContainer>
        
    )
}

export default AdminisracaoRestaurante