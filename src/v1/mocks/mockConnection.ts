export class mockConnection{
    createQueryRunner(){
        return new QueryRunner();
    }
};

class QueryRunner{
    connect(){}
    startTransaction(){}
    commitTransaction(){}
    rollbackTransaction(){}
    release(){}
};