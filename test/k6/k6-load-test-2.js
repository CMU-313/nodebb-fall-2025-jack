// perpelxity generated
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
	stages: [
		{ duration: '10s', target: 5 }, // ramp up
		{ duration: '20s', target: 5 }, // stay steady
		{ duration: '10s', target: 0 }, // ramp down
	],
};

export default function () {
	// simulate different user interactions
	const urls = [
		'http://128.2.221.71:4567',
		'http://128.2.221.71:4567/categories',
	];
	const randomUrl = urls[Math.floor(Math.random() * urls.length)];

	http.get(randomUrl, {
		headers: { 'User-Agent': 'k6-team26' },
	});

	sleep(1);
}
