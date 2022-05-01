import { FindConditions, FindManyOptions } from "typeorm";
import { ServicesV1 } from "../entities/services-v1.entity";

export class mockServicesRepository{
    data = [
        {
            "serviceName": "Service 1",
            "id": 1,
            "totalRequestServed": 12,
            "maxLatency": 433,
            "totalHttp200": 9,
            "totalHttp400": 3,
            "totalHttp502": 0,
            "records": [
                {
                    "id": 1,
                    "payload": "This is some payload for payload 1.",
                    "epochTime": "2022-04-25T04:05:02.795Z",
                    "latency": 100
                },
                {
                    "id": 3,
                    "payload": "This is some payload for payload 3.",
                    "epochTime": "2022-04-25T04:05:02.795Z",
                    "latency": 300
                },
                {
                    "id": 4,
                    "payload": "This is the payload. Add string length to reach extra time.",
                    "epochTime": "2022-04-25T04:24:37.163Z",
                    "latency": 68
                },
                {
                    "id": 5,
                    "payload": "This is the payload. Add string length to reach extra time.",
                    "epochTime": "2022-04-25T04:25:56.690Z",
                    "latency": 58
                },
                {
                    "id": 6,
                    "payload": "This is the payload. Add string length to reach extra time.",
                    "epochTime": "2022-04-25T04:26:15.582Z",
                    "latency": 64
                },
                {
                    "id": 7,
                    "payload": "This is the payload. Add string length to reach extra time.",
                    "epochTime": "2022-04-25T04:26:43.151Z",
                    "latency": 107
                },
                {
                    "id": 8,
                    "payload": "This is the payload. Add string length to reach extra time.",
                    "epochTime": "2022-04-25T04:27:29.602Z",
                    "latency": 422
                },
                {
                    "id": 9,
                    "payload": "This is the payload. Add string length to reach extra time.",
                    "epochTime": "2022-04-25T04:27:41.131Z",
                    "latency": 433
                },
                {
                    "id": 10,
                    "payload": "This is the payload. Add string length to reach extra time.1111111111",
                    "epochTime": "2022-04-25T17:02:08.325Z",
                    "latency": 0
                }
            ]
        },
        {
            "serviceName": "Service 2",
            "id": 2,
            "totalRequestServed": 1,
            "maxLatency": 200,
            "totalHttp200": 1,
            "totalHttp400": 0,
            "totalHttp502": 0,
            "records": [
                {
                    "id": 2,
                    "payload": "This is some payload for payload 2.",
                    "epochTime": "2022-04-25T04:05:02.795Z",
                    "latency": 200
                }
            ]
        }
    ];

    findOne(id: number){
        for (var ob of this.data){
            if (ob.id == id){
                return ob
            }
        }
    }

    // find(options?: FindManyOptions<ServicesV1>): Promise<ServicesV1[]>{
    //     return new Promise((acc, rej)=>{
    //         return this.data;
    //     });
    // }

    // find(conditions?: FindConditions<ServicesV1>): Promise<ServicesV1[]>{
    //     return new Promise((acc, rej)=>{
    //         return this.data;
    //     });
    // }

}