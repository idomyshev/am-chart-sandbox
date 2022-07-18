import pool from "../db/pool.js";

export const showChart = async (request, response) => {
  pool.query("select * from charts where id=$1", [request.params.name], async (error, res) => {
    if (error) {
      console.error(`error get chart, id=${request.params.id}`);
      throw error
    }
    console.log('chart shown, id: ', request.params.id);
    if (res.rows.length) {
      response.send({ success: true, data: res.rows[0] });
    } else {
      response.send({ success: false });
    }
  });
}

export const listCharts = async (request, response) => {
  pool.query("select * from charts", async (error, res) => {
    if (error) {
      console.error(`error list charts, id=${request.params.id}`);
      throw error
    }
    console.log('charts listed');
    if (res.rows) {
      response.send({ success: true, data: res.rows });
    } else {
      response.send({ success: false });
    }
  });
}

export const createOrUpdateChart = async (request, response) => {
  const chart = request.body;
  try {
    const res = await pool.query("select * from charts where name=$1", [chart.name]);
    if (!res.rows || !res.rows.length) {
      pool.query('insert into charts(name, config) values($1, $2)', [chart.name, chart.config], async (error, results) => {
        if (error) {
          console.error('error add chart');
          throw error
        }
        console.log(`chart added, name: ${chart.name}`);
        response.send({success: true});
      });
    } else {
      pool.query('update charts set config=$1 where name=$2', [chart.config, chart.name], async (error, results) => {
        if (error) {
          console.error('error update chart, name: ', chart.name);
          throw error
        }
        console.log(`chart updated, name: ${chart.name}`);
        response.send({success: true});
      });
    }
  } catch (err) {
    console.error('error when try find chart for create/update operation', err);
  }
}