import React from 'react'

const SocialLink = (props) => {
    const { linktype, linkurl } = props
    const SocialLink = [["Linkedin", "./linkedin.png"], ["Facebook", "./facebook.png"], ["Instagram", "./instagram.png"], ["Twitter", "./twitter.png"], ["Github", "./github.png"], ["Other", "./other.png"]]
    return (
        <div className='col-2'>
            {SocialLink.map((item) => {
                if(item[0] === linktype) {
                    {console.log(item[1])}
                    return <a href={linkurl} target='_blank'><img src={item[1]} alt={item[0]+" image"}  /></a>
                }
            })
            }
        </div>
    )
}

export default SocialLink
