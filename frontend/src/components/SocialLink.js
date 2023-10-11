import React from 'react'

// https://i.ibb.co/hD9QkGq/facebook.png
// https://i.ibb.co/5YbQJZR/instagram.png
// https://i.ibb.co/5xKF3Q1/whatsapp.png
// https://i.ibb.co/ZX94Hm1/pic.png
// https://i.ibb.co/VjHfmVp/twitter.png
// https://i.ibb.co/NmLcB7Z/linkedin.png
// https://i.ibb.co/myQxSqc/other.png

const SocialLink = (props) => {
    const { linktype, linkurl } = props
    const SocialLink = [["Linkedin", "https://i.ibb.co/NmLcB7Z/linkedin.png"],
        ["Facebook", "https://i.ibb.co/hD9QkGq/facebook.png"], 
        ["Instagram", "https://i.ibb.co/5YbQJZR/instagram.png"], 
        ["Twitter", "https://i.ibb.co/VjHfmVp/twitter.png"], 
        ["Github", "https://i.ibb.co/ZX94Hm1/pic.png"], 
        ["Other", "https://i.ibb.co/myQxSqc/other.png"]]
    return (
            <div className='m-2'>
                {SocialLink.map((item) => {
                    if (item[0] === linktype) {
                        return <a href={linkurl} target='_blank'><img src={item[1]} style={{ width: '40px', height: '40px' }} alt={item[0]} /></a>
                    }
                })
                }
            </div>
    )
}

export default SocialLink
