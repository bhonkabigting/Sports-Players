const model = require('../BaseModel');
const { enable_profiler } = require('../../config/main');

class Profiler {
    constructor() {
        this.divStyle = `"width: 90%; min-height: 100px; margin: 40px auto; padding: 5px 20px 20px; border: 1px solid grey; text-align: start;"`;
        this.h2Style = `"margin: 10px; font-size: 1.5rem"`
        this.pStyle = `"margin-left: 30px; color: brown;"`
    }

    getBenchmarks(startTime, startMemoryUsage) {
        const executionTime = Date.now() - startTime;
        const memoryUsage = Math.abs(process.memoryUsage().heapUsed - startMemoryUsage);
        const benchmarks = `
            Request execution time: ${executionTime} ms
            <br>
            Memory usage: ${memoryUsage} bytes
        `;

        return benchmarks;
    }

    getQueries() {
        if (model.lastQuery.length === 0) {
            return `No executed queries.`;
        }

        return model.lastQuery;
    }

    static profiling(req, res, next) {
        if (!enable_profiler) {
            next();
        }
        else {
            const profiler = new Profiler();
            const startTime = new Date().getTime();
            const startMemoryUsage = process.memoryUsage().heapUsed;
            const sendResponse = res.send;

            res.send = (body) => {
                const data = {
                    "Benchmarks": profiler.getBenchmarks(startTime, startMemoryUsage),
                    "URI String": req.path,
                    "GET Data": JSON.stringify(req.query),
                    "POST Data": JSON.stringify(req.body),
                    "Session Data": JSON.stringify(req.session),
                    "Database Queries": profiler.getQueries()
                }
    
                let message = "";
                for (let key in data) {
                    message += `
                        <div style=${profiler.divStyle}>
                            <h2 style=${profiler.h2Style}>${key}</h2>
                            <p style=${profiler.pStyle}>${data[key]}</p>
                        </div>
                    `;
                }
        
                model.lastQuery = [];
                body += message;
        
                sendResponse.call(res, body);
            };
    
            next();
        }
    }
}

module.exports = Profiler.profiling;