/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


{
	"Version": "2012-10-17",
	"Id": "http referer policy example",
	"Statement": [
		{
			"Sid": "Allow get requests originating from http://www.nepaliroommate.com",
			"Effect": "Allow",
			"Principal": "*",
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::nrm/*",
			"Condition": {
				"StringLike": {
					"aws:Referer": [
						"http://localhost:5000/*",
						"http://www.nepaliroommate.com/*"
					]
				}
			}
		}
	]
}



<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>http://localhost:5000</AllowedOrigin>
        <AllowedOrigin>http://www.nepaliroommate.com</AllowedOrigin>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>DELETE</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <ExposeHeader>x-amz-server-side-encryption</ExposeHeader>
        <ExposeHeader>x-amz-request-id</ExposeHeader>
        <ExposeHeader>x-amz-id-2</ExposeHeader>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>