
const {models} = require("../models");
const Sequelize = require("sequelize");

exports.index = (req, res, next) => {
    res.render('stats/index');
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

exports.update = (req, res, next)=>{
    let usuarios;
    let tips;
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

    Promise.all(promises).then(()=>{
    const stat = models.stat.build({
        fecha,
        usuarios,
        tips
    });

    stat.save({fields: ["fecha", "usuarios","tips"]});
    res.redirect("/stats");
    })

}