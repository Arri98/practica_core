
const {models} = require("../models");
const Sequelize = require("sequelize");

exports.index = (req, res, next) => {
    let fechasArray=[];
    let usersArray=[];
    let tipsArray=[];
    let quizzesArray=[];
    models.stat.findAll()
    .then(data=>{
        data.forEach((dato,index)=>{
            usersArray.push(dato.usuarios);
            fechasArray.push(dato.fecha);
            quizzesArray.push(dato.quizzes);
            tipsArray.push(dato.tips);
        })
       
        const fechas=JSON.stringify(fechasArray);
        const users=JSON.stringify(usersArray);
        const quizzes=JSON.stringify(quizzesArray);
        const tips=JSON.stringify(tipsArray);

        res.render('stats/index',{quizzes,fechas,users,tips});
    })
};


exports.users = (req, res, next) => {
    let fechasArray=[];
    let usersArray=[];
    models.stat.findAll()
    .then(data=>{
        data.forEach((dato,index)=>{
            usersArray.push(dato.usuarios);
            fechasArray.push(dato.fecha);
        })
       
        const fechas=JSON.stringify(fechasArray);
        const users=JSON.stringify(usersArray);
        res.render('stats/users',{fechas,users});

    })
};

exports.tips = (req, res, next) => {
    let fechasArray=[];
    let tipsArray=[];
    models.stat.findAll()
    .then(data=>{
        data.forEach((dato,index)=>{
           
            tipsArray.push(dato.tips);
            fechasArray.push(dato.fecha);
        })
        console.log(fechasArray);

        const fechas=JSON.stringify(fechasArray);
        const tips=JSON.stringify(tipsArray);
        res.render('stats/tips',{fechas,tips});

    })
};

exports.quizzes = (req, res, next) => {
    let fechasArray=[];
    let quizzesArray=[];
    models.stat.findAll()
    .then(data=>{
        data.forEach((dato,index)=>{
           
            quizzesArray.push(dato.quizzes);
            fechasArray.push(dato.fecha);
        })
        console.log(fechasArray);

        const fechas=JSON.stringify(fechasArray);
        const quizzes=JSON.stringify(quizzesArray);
        res.render('stats/quizzes',{quizzes,fechas});

    })
};

exports.update = (req, res, next)=>{
    let usuarios;
    let tips;
    let quizzes;
    const fecha= Date.now()
    var promises=[];

    promises.push(
        models.user.count()
            .then(count=>{
                usuarios=count;
            })
    );

    promises.push(
        models.tip.count()
            .then(count=>{
                tips=count;
            })
    );

    promises.push(
        models.quiz.count()
            .then(count=>{
                quizzes=count;
            })
    );

    Promise.all(promises).then(()=>{
    const stat = models.stat.build({
        fecha,
        usuarios,
        tips,
        quizzes
    });

    stat.save({fields: ["fecha", "usuarios","tips","quizzes"]});
    res.redirect("/stats");
    })

}