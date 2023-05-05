import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import ITags from "../../../interfaces/ITag"
import axios from "axios"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import http from "../../../http"
import { useParams } from "react-router-dom"



const FormularioPratos = () => {
    
    const [nomePrato, setNomePrato] = useState('')
    const [tag, setTag] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)
    const [descricao, setDescricao] = useState('')
    const [restaurante, setRestaurante] = useState('')

    const [tags, setTags] = useState<ITags[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    
    const params = useParams()

    useEffect(() => {
        if(params.id){
           axios.get(`http://localhost:8000/api/v2/pratos/${params.id}/`)
           .then(response => {
            console.log(response)
                setNomePrato(response.data.nome)
                setDescricao(response.data.descricao)
                setImagem(response.data.imagem)
                setTag(response.data.tag)
                setRestaurante(response.data.restaurante)
            console.log(imagem)
           }) 
        }
        axios.get("http://localhost:8000/api/v2/tags/")
        .then(response => setTags(response.data.tags))
        axios.get("http://localhost:8000/api/v2/restaurantes/")
        .then(response => setRestaurantes(response.data))
    }, [params.id])

    const selecionaArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        
        if(evento.target.files?.length){
            setImagem(evento.target.files[0])
            console.log(evento.target.files[0])
            
        }else{
            setImagem(null)
        }
    }
    
    const submeter = (evento: React.FormEvent<HTMLDivElement>) => {
        evento.preventDefault()
        
        const formData = new FormData()
        
        formData.append('nome', nomePrato )
        formData.append('descricao', descricao )
        formData.append('tag', tag )
        formData.append('restaurante', restaurante )
        if (imagem){
            
            formData.append('imagem', imagem )
        }
        
        if (params.id){
            http.request({
                url: `pratos/${params.id}/`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })  
            .then(() =>{
            setNomePrato('')
            setDescricao('')
            setTag('')
            setRestaurante('')
            alert('cadastro feito')
        })    
        }
        

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        .then(() =>{
            setNomePrato('')
            setDescricao('')
            setTag('')
            setRestaurante('')
            alert('cadastro feito')
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <Box sx={{display: 'flex', alignItems: 'center' , flexDirection: 'column', flexGrow: 1}}>
            <Typography>Formulario dos Pratos</Typography>
            <Box onSubmit={submeter} component='form'>
                <TextField 
                    onChange={ev => setNomePrato(ev.target.value)}
                    value={nomePrato}
                    label="nome do prato"
                    fullWidth
                    required
                    margin="dense"
                >
                </TextField>
                <TextField 
                    onChange={ev => setDescricao(ev.target.value)}
                    value={descricao}
                    label="descricao"
                    fullWidth
                    required
                    margin="dense"
                >
                </TextField>

                <FormControl margin="dense" fullWidth >
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                        {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                            {tag.value}
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl margin="dense" fullWidth >
                    <InputLabel id="select-restaurante">restaurante</InputLabel>
                    <Select 
                        labelId="select-restaurante" 
                        value={restaurante} 
                        onChange={evento => setRestaurante(evento.target.value)}>
                            {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}
                            
                            >{restaurante.nome}</MenuItem>)}
                    </Select>
                </FormControl>
               
                
                <input type="file" onChange={selecionaArquivo}/>

                <Button variant='outlined' type="submit">Salvar</Button>
            </Box>
        </Box>
    )
} 
export default FormularioPratos