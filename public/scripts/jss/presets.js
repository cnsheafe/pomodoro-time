const spinnerJss = {
  'clip': 'rect(auto 150px auto auto)',
  'border-radius': '50%',
  'z-index': '200',
  'border': '5px solid green'
};


let fillerJss = Object.assign({}, spinnerJss);
fillerJss['z-index'] = '250';

const maskJss = {
  'clip': 'rect(auto 150px auto auto)',
  'z-index': '300',
  'opacity': '1',
  'background': 'white'
};

module.exports = {spinnerJss,fillerJss,maskJss};
