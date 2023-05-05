import { Box, Button, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"
import { IPaginacao } from "../../../interfaces/IPaginacao"

const FormularioRestaurante = () => {
    
    const parametros = useParams()

    useEffect(() => {
        if (parametros.id){
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
            .then(resposta => setNomeRestaurante(resposta.data.nome))
            .catch(err => {
                console.log(err)
            })
        }
     
    }, [parametros])
    
    const [nomeRestaurante, setNomeRestaurante] = useState('')
    const [paginaAnterior, setPaginaAnterior] = useState('')


    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if(parametros.id){
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
            .then(() => {
                alert('restaurante atualizado')
            })
        }else{

            axios.post('http://localhost:8000/api/v2/restaurantes/', {
                nome: nomeRestaurante
            })
            .then(() => {
                alert('restaurante cadastrado')
            })
        }

    }


    return(
        <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography component='h1' variant="h6">Formulario restaurantes</Typography>
            <Box component="form" onSubmit={aoSubmeterForm}>
                <TextField  
                    value={nomeRestaurante} 
                    onChange={evento => setNomeRestaurante(evento.target.value)} 
                    id="standard-basic" 
                    label="Nome do restaurante"
                    variant="standard"
                    fullWidth 
                    required/>
                <Button  fullWidth sx={{marginTop: 1}} type='submit'variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioRestaurante