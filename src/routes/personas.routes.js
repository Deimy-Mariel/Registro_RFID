import {Router} from 'express'
import pool from '../database.js'

const router = Router();

/*router.get('/add', (req,res)=>{
    res.render('personas/add');
});*/

router.get('/add', async(req, res) => {
    try {
        const [carreras] = await pool.query('SELECT * FROM Carrera');
        const [materias] = await pool.query('SELECT * FROM Materia');
        res.render('personas/add', { carreras, materias });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/add', async(req, res)=>{
    //console.log(req.body);
    try{
        const {nombre, apellido, matricula, recinto, carrera, materia, rfid} = req.body;
        const newPersona = {
            nombre, apellido, matricula, recinto, carrera, materia, rfid
        }
        await pool.query('CALL InsertPersona(?, ?, ?, ?, ?, ?, ?)', 
    [newPersona.nombre, newPersona.apellido, newPersona.matricula, newPersona.recinto, newPersona.carrera, newPersona.materia, newPersona.rfid]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/list', async(req, res)=>{
    try{
        const [result] = await pool.query('CALL ListarPersona()');
        res.render('personas/list', {personas: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/edit/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const [persona] = await pool.query('SELECT * FROM Persona WHERE id = ?', [id]);
        const personaEdit = persona[0];
        res.render('personas/edit', {persona: personaEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/edit/:id', async(req, res)=>{
    try{
        const {nombre, apellido, matricula, recinto, carrera, materia, rfid} = req.body;
        const {id} = req.params;
        const editPersona = {nombre, apellido, matricula, recinto, carrera, materia, rfid};
        await pool.query('UPDATE Persona SET ? WHERE id = ?', [editPersona, id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/delete/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM Persona WHERE id = ?', [id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
export default router;
