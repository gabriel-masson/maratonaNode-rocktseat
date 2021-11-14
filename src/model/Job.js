let data = [
    {
        id: 1,
        name: "mirai",
        "daily-hours": 24,
        "total-hours": 1200,
        created_At: Date.now()
    },
    {
        id: 2,
        name: "ODEN NITORIU",
        "daily-hours": 8,
        "total-hours": 24,
        created_At: Date.now()
    }
];

module.exports ={
    get(){
        return data;
    },
    update(newJob){
        data = newJob;
    },
    delete(id){
        data = data.filter(job => Number(job.id) !== Number(id));
    }
}