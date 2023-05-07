import { sleep, group } from 'k6'
import http, { head } from 'k6/http'

export const options = {
  ext: {
    loadimpact: {
      distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
      apm: [],
    },
  },
  thresholds: {
    http_req_duration: ['p(90)<40000'], // 90% of requests must complete below 40s
    http_req_failed : ['rate<0.03'],   // the error rate must be lower than 3%
  },
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 2, duration: '5m' },
        { target: 2, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {

  const Loginparams = {
      login: 'de_support',
      password: 'DE_Support1',
      _csrf: 'ab5d45bd-0504-43af-a0ff-8e71285cd1c1',
      'g-recaptcha-response':
        '03AFY_a8V5XDYMiNEGDZIdt4oR3WqI78sNzwmQyJK064AQt5TIE6527y-92XTigO4X_GRxXcRFTmoVzj08QYMV880_TuGXKXud9Gz56jAZ46etrOU0AQWVORfGdrulNRjHE6GbQhmEQqJdQblyGA8CioL18tmoXIjfxHM_df6tpKlgELtXKzzdHsyv-4Km0Yd2FtpSsAs9Nm1wsaEuIggNYBWe9Xdq-YRO8g_g_wfeSfUc33hYwxIQgH_fQ3zdxhYvkjxrlDXILih5PZWAc4g2DKeici0itY9cOAWfyil8LZWjHRDl8H4S682xgo1duLmXO-b8kaKLVLJifAkkvvsqSfo6aEQyFMRK-D4Iz9f3683Cowilj_jjmvD9N-ttoznDJEjRmo3ok3zxgSaWpHMZowJmnyJDUBzEvpANLMFp9e8B6o0-WX-jBgW5dhahMWU3RlWUVxrzrLCXZdoRCsfh8IS7iqx7BYEiUi3FBfj6YCWjYJqTKmUSkoFcxrnjLtn7bE29wDhQFYr-',
  }
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    origin: 'https://selfcare.safaricom.co.ke',
    accept: 'application/json, text/javascript, */*; q=0.01',
    'x-requested-with': 'XMLHttpRequest',
    'upgrade-insecure-requests': '1',
    'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"'
  }
  const Logoutparams = {
    _csrf: 'f7b567cf-dcc1-49d3-af2c-beefe8ab98d6'

  }
  const SefcarePortalUrl = "https://selfcare.safaricom.co.ke/frontend/rest/v1"
  let response

  group('page_1 - Login', function () {
    response = http.post(SefcarePortalUrl,'/login',Loginparams,headers)
    sleep(10)
    response = http.get(SefcarePortalUrl,'/promotionwidget?bannerPosition=2&bannerPage=welcome',headers)
    response = http.get(SefcarePortalUrl,'/bongapoints/summary', headers)
    response = http.get(SefcarePortalUrl,'/promotionwidget?bannerPosition=1&bannerPage=welcome',headers)
    sleep(4.1)
    response = http.get(SefcarePortalUrl,'/profileAjax/notificationsList',headers)
    response = http.get(SefcarePortalUrl,'/usageAjax/usageDonutChart?subscriberId=',headers)
    response = http.get(SefcarePortalUrl,'/mpesaAjax/getMpesaLastStatement',headers)
    response = http.get(SefcarePortalUrl,'/profileAjax/showMoreHistory?subscriberId=&id=1',headers)
    sleep(24.5)
  })
}