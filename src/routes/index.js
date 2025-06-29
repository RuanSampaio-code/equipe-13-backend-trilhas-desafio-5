import express from 'express';
import userRoutes from './userRoutes.js';
import healthUnitRoutes from './healthUnitRoutes.js';

const routes = (app) => {
    
    app.route("/").get((req, res) => res.status(200).send("Curso de node.js"));

    app.use(userRoutes);

    app.use(healthUnitRoutes);
}

export default routes;