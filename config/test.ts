export enum ConfigName {
	port = "port",
	dbUri = "dbUri",
	saltFactor = "saltFactor",
	accessTokenExpiration = "accessTokenExpiration",
	refreshTokenExpiration = "refreshTokenExpiration",
	jwtPublicKey = "jwtPublicKey",
	jwtPrivateKey = "jwtPrivateKey",
}

export default {
	port: 3000,
	dbUri: "mongodb://localhost:27017/phoom",
	saltFactor: 10,
	accessTokenExpiration: "15m",
	refreshTokenExpiration: "1y",
	jwtPublicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC2OrK2N8gY1DjNkTKt1FEjxHPP
O3/OUxbr9XXmSOyrFKEBVBRN2iCqJbA+ODp3OibRLn0HktJXzjrbFXbmnFaXhKTb
a7mbxCOcqR8IY03pQjFwaBYWvl7touEVRknOU1ffFo8w8eKqm44LqRc3kNxYueyq
AgU8RS0YCX2oOQLXzQIDAQAB
-----END PUBLIC KEY-----`,
	jwtPrivateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQC2OrK2N8gY1DjNkTKt1FEjxHPPO3/OUxbr9XXmSOyrFKEBVBRN
2iCqJbA+ODp3OibRLn0HktJXzjrbFXbmnFaXhKTba7mbxCOcqR8IY03pQjFwaBYW
vl7touEVRknOU1ffFo8w8eKqm44LqRc3kNxYueyqAgU8RS0YCX2oOQLXzQIDAQAB
AoGBAJlgHjqwCIKdXJHou7cDFKf+GVs6wP9vf8Np/amth0UXP8xWcCB2jzemMQit
Wsgu8azua92L/e5ZbcAn+MNwoo/FMeg/HBVYMJAJAeX7cdlnuwQuqGYlWR7qz6sA
X7q3ZvxRRLbuwQYk/xc+XyoNBuzsVarqVNcOSanSy2wuGi8BAkEA+uHPiTDp+A4x
mkjUBLKo7vm0CNkjXJrE51iL0/rDt9J5J0p7z5eEynj9jV6/kTKFruefKpawyWEk
w4Z9ITNQZQJBALnyXB1TPwN9J12dN5yvkzmwpQwypNQpf+3GSqAJyF/ikrXTdxON
xTfKx1p5kkQfn6RsCjXZsNt5Hc08o+bPD0kCQQDQUElz38KWLqrvMcOiNvrgm0Pr
COk8zmHqunI4TILQkpn4jvcpEuW2/SmDhgXIuUuZREe8JC2cuOW+2F/z/lilAkAa
GaHCX//1TmjrI/k9XgutSlUwbB9kxFp3lqC87AKbKuNq8D7DmN+44BaxZWUZeNLg
smWQf3jqpYqAV2WuLRw5AkA0yoxf/VxwbQ9NMsS06xN/+HhnVK1abg6O0shKmS8u
yuvJJES6OYDsi6fezcWGzgkxoiy2s0F/ySL8q+CYH94m
-----END RSA PRIVATE KEY-----`,
};
