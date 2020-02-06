import { createTableService, TableQuery, TableUtilities } from "azure-storage"
const azureTableService = createTableService(process.env.AZURE_STORAGE_CONNECTION_STRING);
const Units = process.env.AZURE_STORAGE_UNITS_TABLE_NAME;

export module Azure {
    export async function post(req, res, next) {
        let body = await req.body;
        console.log(req)
        console.log(body)
        res.send(`Azure dummy response: ${JSON.stringify(req.body)}`);
        return next();
    }

    // retrieve all rows, yo
    export function get(req, res, next) {
        const query = createQuery(100);
        queryTable(Units, query).then(entries => {
            res.send(entries);
            return next();
        }).catch(err => {
            res.send(`lol error${err}`)
        })
    }


    /**
     * Function that simplifes creating a new TableQuery from azure-storage
     * 
     * @param {*} top 
     * @param {*} select 
     * @param {*} filter 
     */
    function createQuery(top: number, select?: string, filter?: string) {
        let query = new TableQuery().top(top);
        if (select) {
            query = query.select(select);
        }
        if (filter) {
            query = query.where(filter);
        }
        return query;
    }

    /**
 * Queries a table using the specified query
 * 
 * @param {*} table 
 * @param {*} query 
 */
    function queryTable(table, query) {
        return new Promise((resolve, reject) => {
            azureTableService.queryEntities(table, query, null, (error, result) => {
                if (!error) {
                    return resolve(result.entries);
                } else {
                    reject(error);
                }
            });
        });
    };

    /**
     * Adds an entity
     * 
     * @param {*} table 
     * @param {*} item 
     */
    function addEntity(table, item) {
        return new Promise((resolve, reject) => {
            azureTableService.insertEntity(table, item, (error, result) => {
                if (!error) {
                    return resolve(result['.metadata']);
                } else {
                    reject(error);
                }
            })
        });
    };

    /**
     * Updates the entity
     * 
     * @param {*} table 
     * @param {*} item 
     */
    function updateEntity(table, item) {
        return new Promise((resolve, reject) => {
            azureTableService.insertOrReplaceEntity(table, item, undefined, (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            })
        });
    };

    /**
     * Executes a batch operation
     * 
     * @param {*} table 
     * @param {*} batch 
     */
    function executeBatch(table, batch) {
        return new Promise((resolve, reject) => {
            azureTableService.executeBatch(table, batch, (error, result) => {
                if (!error) {
                    return resolve(result);
                } else {
                    reject(error);
                }
            })
        });
    };
}
export default Azure;