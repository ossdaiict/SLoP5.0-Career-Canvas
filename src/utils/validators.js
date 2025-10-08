export function isEmail(value) {
	return /.+@.+\..+/.test(String(value || ''));
}
