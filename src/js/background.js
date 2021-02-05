const obtainBgImage = async (URL_BG, ACCESS_KEY, currentDate) => {
   try {
       let bgImageInfo = null;
        if(!isVisted() || isDifferentDate(currentDate)) {
            bgImageInfo = await fetch(`${URL_BG}=${ACCESS_KEY}`, {
                params: {
                    count:1
            }})
            bgImageInfo = await bgImageInfo.json();
            localStorage.setItem('bg-image-info', JSON.stringify(bgImageInfo));
        } else {
            bgImageInfo = JSON.parse(localStorage.getItem('bg-image-info'));
        }
        return bgImageInfo;
   } catch (error) {
        console.error(error);
   }
}

const isVisted = () => {
    if(localStorage.getItem('current-date') !== null) return true;
    return false;
}

const isDifferentDate = currentDate => {

    if(localStorage.getItem('current-date') !== String(currentDate)) return true;
    return false;
}

const applyBgToBody = bgImage => {
    document.querySelector('body').style.background = `url(${bgImage}) center center`;
}

const showBgInfo = (location, username) => {
    document.getElementById('location').textContent = location === null ? 'The location information is not provided': location;
    document.getElementById('photoProvider').textContent = username === null ? 'Unknown' : username;
}

const bgHandler = async (URL_BG, ACCESS_KEY, currentDate) => { 
    const bgImageInfo = await obtainBgImage(URL_BG, ACCESS_KEY, currentDate);

    applyBgToBody(bgImageInfo.urls.full);
    showBgInfo(bgImageInfo.user.location, bgImageInfo.user.name);
};

export default bgHandler;
