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
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };
        const [id] = await trx('points').insert(point).returning('id');

        const pointItems = items
        .split(',')
        .map((item:string) => Number(item.trim()))
        .map((item_id: number) =>{
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

            const serializedPoint = {
                    ...point,
                    image_url: `http://192.168.1.4:3333/uploads/marketplaces/${point.image}`,
            };

        return response.json({point: serializedPoint,items});
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
        
        const serializedPoints = points.map(point => {
            return{
                ...point,
                image_url: `http://192.168.1.4:3333/uploads/marketplaces/${point.image}`,
            };
        });


        return response.json(serializedPoints);
    }
}

export default PointsController;