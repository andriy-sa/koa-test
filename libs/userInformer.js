const Octokit = require('@octokit/rest');
const axios = require('axios');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class UserInformer {
  constructor(message) {
    this.message = message;
    this.octokit = new Octokit({
      auth: {
        username: process.env.GITHUB_USERNAME,
        password: process.env.GITHUB_PASSWORD
      }
    });
  }

  setUser(username) {
    this.username = username;
    this.user = null;
    this.weather = null;
  }

  async inform() {
    const response = await this.octokit.users.getByUsername({ username: this.username });
    if (response.status !== 200 || !response.data.email) {
      return false;
    }

    this.user = {
      login: response.data.login,
      name: response.data.name,
      email: response.data.email,
      location: response.data.location
    };
    this.weather = await this.__getWeather();
    await this.__sendMail();

    return null;
  }

  async __getWeather() {
    if (!this.user.location) {
      return null;
    }
    const response = await axios.get(process.env.OPEN_WEATHER_MAP_URL, {
      params: {
        q: this.user.location.split(',')[0],
        APPID: process.env.OPEN_WEATHER_MAP_APPID
      },
      validateStatus: status => true
    });
    if (response.status === 200) {
      return response.data;
    }
    return null;
  }

  async __sendMail() {
    const msg = {
      to: this.user.email,
      from: 'test@gmail.com',
      subject: 'Test Message',
      html: this.message
    };

    if (this.weather) {
      msg.html = `${this.message} <br> <br>
               Location: ${this.user.location} <br> 
               Weather: ${this.weather.weather[0].main}, ${this.weather.weather[0].description} <br>
               Temperature: ${this.weather.main.temp - 273.15} Celsius<br>`;
    }
    await sgMail.send(msg);
  }
}

module.exports = UserInformer;
