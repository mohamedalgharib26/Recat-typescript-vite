function greet(name: string) {
  // الدالة الخارجية التي تأخذ "name"
  // هذه هي Higher-Order Function

  // تُعيد دالة داخلية
  return function (message: string) {
    // هذه هي الدالة الداخلية (callback)
    // بفضل الـ closure، يمكنها الوصول إلى "name"
    console.log(`Hello, ${name}! This is a ${message} from me.`);
  };
}

// 1. نحن نستخدم الدالة الخارجية ونعطيها معلومة "Ali"
// هذا يُعيد لنا دالة جديدة تُشبه: function(message) { console.log(`Hello, Ali! ...`); }
const greetAli = greet("Ali");

// 2. الآن، نستخدم الدالة الجديدة (callback) التي تم إعدادها مسبقاً
// هذه الدالة تتذكر "Ali" وتُشغل نفسها
greetAli("message"); // Output: Hello, Ali! This is a message from me.

const greetSarah = greet("Sarah");
greetSarah("quick call"); // Output: Hello, Sarah! This is a quick call from me.
