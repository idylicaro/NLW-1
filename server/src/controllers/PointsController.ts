import {Request, Response} from 'express';
import knex from '../database/connection';
class PointsController{
    async create(request:Request,response:Response){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
        const trx = await knex.transaction();
        // esse modo de retorna o id acho que so é  para pg , se for usar outro sdbc procurar na doc.
        const point = {
            image: 'https://images.unsplash.com/photo-1475275083424-b4ff81625b60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };
        const [id] = await trx('points').insert(point).returning('id');
        const pointItems = items.map((item_id: number) =>{
            return{
                item_id,
                point_id: id
            };
        })
        
        await trx('point_items').insert(pointItems);

        await trx.commit();
        return response.json( {
            ...point,
            id:id
        } );
    
    }

    async  show(request:Request, response:Response){
        const {id} = request.params;

        const point = await knex('points').where('id',id).first();

        if(!point){
            return response.status(400).json( {mensage:'Point not found!'})
        }
        const items = await knex('items')
            .join('point_items','items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('title');
        return response.json({point,items});
    }

    async index(request:Request,response:Response){
        //filtros cidade,uf,items (Query Params)
        const {city,uf,items}=request.query;            //item.trim() tira espaçoes
        const parsedItems = String(items)
            .split(',')
            .map(item =>Number(item.trim()));
        const points = await knex('points')
            .join('point_items', 'points.id' , '=', 'point_items.point_id')
            .whereIn('point_items.item_id',parsedItems)
            .where('city',String(city))
            .where('uf',String(uf))
            .distinct()
            .select('points.*');
        
        return response.json(points);
    }
}

export default PointsController;